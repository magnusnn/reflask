# Simple reverse proxy for use with webpack-dev-server.
def proxyRequest(host, path):
    print("%s%s"%(host, path))
    response = get("%s%s"%(host, path))
    excluded_headers = [
        "content-encoding",
        "content-length",
        "transfer-encoding",
        "connection",
    ]

    headers = {
        name: value
        for name, value in response.raw.headers.items()
        if name.lower() not in excluded_headers
    }

    return (response.content, response.status_code, headers)