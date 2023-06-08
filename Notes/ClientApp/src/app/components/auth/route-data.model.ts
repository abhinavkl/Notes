

export class RouteData {
    public authenticated: boolean;
    constructor(
        public includeClaims: string[]=[],
        public includeRoles: string[]=[],
        public excludeClaims: string[]=[],
        public excludeRoles: string[]=[]
    ) {
        this.authenticated = includeClaims.length > 0;
        this.authenticated ||= includeRoles.length > 0;
        this.authenticated ||= excludeClaims.length > 0;
        this.authenticated ||= excludeRoles.length > 0;
    }

    static includeclaims(claims:string[]){
        return new RouteData(claims)
    }

    static excludeclaims(claims:string[]){
        return new RouteData([],[],claims)
    }

    static claims(include:string[],exclude:string[]){
        return new RouteData(include,[],exclude)
    }
}

export class KeyValuePair {
    constructor(
        public key: string,
        public value: string
    ) { }
}


