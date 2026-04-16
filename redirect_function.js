function handler(event) {
    var request = event.request;
    var response = {
        statusCode: 301,
        statusDescription: 'Moved Permanently',
        headers: {
            'location': { value: 'https://smartthanks.world' + request.uri }
        }
    };
    return response;
}
