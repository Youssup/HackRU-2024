
// TODO: change to use dotenv
const API = "http://localhost:3000/api/v1";

export function rest(url: string, body?: unknown, method?: string, headers?: HeadersInit){
    return fetch(url, {
        method: method ?? (body ? "POST" : "GET"),
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: body ? JSON.stringify(body) : undefined
    }).then(response => response.ok 
            ? response.json()
            : response.json().then(err => Promise.reject(err)))
}

export function api(action: string, body?: unknown, method?: string, headers?: HeadersInit){
    return rest(`${API}/${action}`, body, method, headers);
}

export function loadScript(url: string, id: string){
    return new Promise((resolve, reject) => {
        if (document.getElementById(id)) {
            return resolve(true);
        }

        const script = document.createElement("script");

        script.src = url;
        script.id = id;
        script.onload = resolve;
        script.onerror = reject;
        
        document.head.appendChild(script);
    })
}