import { Email } from '../types/inbox';

export class GmailApiService {
  private static accessToken: string | null = null;
  private static userEmail: string | null = null;

  static setAccessToken(token: string) {
    this.accessToken = token;
  }

  static getAccessToken() {
    return this.accessToken;
  }

  static setUserEmail(email: string) {
    this.userEmail = email;
  }

  static getUserEmail() {
    return this.userEmail;
  }

  /**
   * Triggers Google Identity Services OAuth 2.0 Popup
   */
  static requestAccessToken(clientId: string): Promise<{ token: string; email?: string }> {
    return new Promise((resolve, reject) => {
      if (!window.google || !window.google.accounts || !window.google.accounts.oauth2) {
        reject(new Error('Google Identity Services SDK not loaded yet.'));
        return;
      }

      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/userinfo.email',
        callback: async (response: any) => {
          if (response.error) {
            reject(new Error(response.error_description || response.error));
            return;
          }
          this.accessToken = response.access_token;

          // Fetch user profile email
          try {
            const profileRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
              headers: { Authorization: `Bearer ${response.access_token}` }
            });
            if (profileRes.ok) {
              const profile = await profileRes.json();
              this.userEmail = profile.email;
            }
          } catch (e) {
            console.warn('Could not fetch user profile email', e);
          }

          resolve({ token: response.access_token, email: this.userEmail || undefined });
        }
      });

      client.requestAccessToken();
    });
  }

  /**
   * Fetches real inbox messages via Gmail REST API
   */
  static async fetchRealInbox(daysAgo: number = 3): Promise<Email[]> {
    if (!this.accessToken) {
      throw new Error('No Gmail access token found. Please connect your Gmail account first.');
    }

    const query = `newer_than:${daysAgo}d`;
    const listUrl = `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=30&q=${encodeURIComponent(query)}`;

    const listRes = await fetch(listUrl, {
      headers: { Authorization: `Bearer ${this.accessToken}` }
    });

    if (!listRes.ok) {
      throw new Error(`Gmail API returned error ${listRes.status}: ${listRes.statusText}`);
    }

    const listData = await listRes.json();
    const messages = listData.messages || [];

    if (messages.length === 0) {
      return [];
    }

    // Fetch details for top 25 messages in parallel
    const emailPromises = messages.slice(0, 25).map(async (msg: { id: string; threadId: string }) => {
      const msgRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=full`, {
        headers: { Authorization: `Bearer ${this.accessToken}` }
      });

      if (!msgRes.ok) return null;

      const detail = await msgRes.json();
      return this.parseGmailMessage(detail);
    });

    const parsed = await Promise.all(emailPromises);
    return parsed.filter((e): e is Email => e !== null);
  }

  private static parseGmailMessage(detail: any): Email {
    const headers = detail.payload?.headers || [];
    const getHeader = (name: string) => headers.find((h: any) => h.name.toLowerCase() === name.toLowerCase())?.value || '';

    const fromRaw = getHeader('From');
    const subject = getHeader('Subject') || '(No Subject)';
    const dateStr = getHeader('Date');

    // Parse sender name & email
    const fromMatch = fromRaw.match(/(.*?)\s*<([^>]+)>/);
    const sender = fromMatch ? fromMatch[1].replace(/^["']|["']$/g, '').trim() : fromRaw;
    const senderEmail = fromMatch ? fromMatch[2] : fromRaw;

    const timestamp = dateStr ? new Date(dateStr).toISOString() : new Date().toISOString();
    const body = this.extractBody(detail.payload);

    return {
      id: detail.id,
      threadId: detail.threadId,
      sender: sender || 'Unknown Sender',
      senderEmail: senderEmail || '',
      senderRole: 'Gmail Contact',
      recipient: getHeader('To') || 'Me',
      subject,
      body: body || detail.snippet || 'No preview content available.',
      timestamp,
      timeAgo: this.formatTimeAgo(timestamp),
      isUnread: detail.labelIds?.includes('UNREAD') || false,
      category: this.categorizeEmail(subject, fromRaw, detail.snippet || '')
    };
  }

  private static extractBody(payload: any): string {
    if (!payload) return '';
    if (payload.body && payload.body.data) {
      return this.base64Decode(payload.body.data);
    }
    if (payload.parts && payload.parts.length > 0) {
      for (const part of payload.parts) {
        if (part.mimeType === 'text/plain' && part.body && part.body.data) {
          return this.base64Decode(part.body.data);
        }
      }
      for (const part of payload.parts) {
        if (part.mimeType === 'text/html' && part.body && part.body.data) {
          const html = this.base64Decode(part.body.data);
          return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        }
      }
    }
    return '';
  }

  private static base64Decode(encoded: string): string {
    try {
      const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
      return decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
    } catch (e) {
      return atob(encoded.replace(/-/g, '+').replace(/_/g, '/'));
    }
  }

  private static categorizeEmail(subject: string, from: string, snippet: string): any {
    const s = (subject + ' ' + from + ' ' + snippet).toLowerCase();
    if (s.includes('newsletter') || s.includes('digest') || s.includes('unsubscribe')) return 'NEWSLETTER';
    if (s.includes('discount') || s.includes('offer') || s.includes('sale') || s.includes('promo')) return 'PROMO';
    if (s.includes('no-reply') || s.includes('ci/cd') || s.includes('build') || s.includes('invoice')) return 'SYSTEM';
    if (s.includes('meeting') || s.includes('calendar') || s.includes('sync')) return 'MEETING';
    if (s.includes('hr') || s.includes('tax') || s.includes('compliance')) return 'HR';
    return 'PROJECT';
  }

  private static formatTimeAgo(isoString: string): string {
    const diffMs = Date.now() - new Date(isoString).getTime();
    const hours = Math.floor(diffMs / 3600000);
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }
}
