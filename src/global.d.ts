// Augment the global Window interface to include the Google Identity Services SDK
interface Window {
  google: {
    accounts: {
      oauth2: {
        initTokenClient: (config: {
          client_id: string;
          scope: string;
          callback: (response: any) => void;
        }) => { requestAccessToken: () => void };
      };
    };
  };
}
