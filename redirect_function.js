function handler(event) {
    var uri = event.request.uri;
    // URIが/で始まらない場合はルートにフォールバック
    if (typeof uri !== 'string' || uri.charAt(0) !== '/') {
        uri = '/';
    }
    var response = {
        statusCode: 301,
        statusDescription: 'Moved Permanently',
        headers: {
            'location': { value: 'https://smartthanks.world' + uri }
        }
    };
    return response;
}
