class EmailError extends Error {
  message: string;

  code: number;

  response: {
    headers: { [key: string]: string };
    body: {
      errors: [
        {
          message: string;
          field: null;
          help: null;
        }
      ];
    };
  };

  constructor(message: string, code: number, response: any) {
    super(message);
    this.message = message;
    this.code = code;
    this.response = response;
  }
}

export default EmailError;
