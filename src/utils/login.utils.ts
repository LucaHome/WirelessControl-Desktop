export const validateNextCloudUrl = (baseUrl: string): boolean =>
    baseUrl.length > 0 && /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}(\.[a-z]{2,6})?\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(baseUrl);

export const validatePassPhrase = (passPhrase: string): boolean =>
    passPhrase.length > 0;

export const validateUserName = (userName: string): boolean =>
    userName.length > 0;
