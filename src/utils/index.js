export const supportWebp = () => {
    const elem = document.createElement('canvas');
    if (elem.getContext && elem.getContext('2d')) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
};

export const setImage = (isSupportWebp, baseImg, baseImgWebp, desktopImg, desktopImgWebp) => {
    const obj = {
        base: isSupportWebp ? baseImgWebp : baseImg,
        desktop: isSupportWebp ? desktopImgWebp : desktopImg,
    };
    console.log('obj: ', obj);

    return obj;
};

export function shortenAddress(address, chars = 4) {
    if (!address) return new Error('No address provided');
    return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function throttle(func, delay) {
    let timerId;
    let lastTime;

    return function throttled(...args) {
        const now = Date.now();
        const timeSinceLastCall = now - lastTime;

        if (!lastTime || timeSinceLastCall >= delay) {
            func.apply(this, args);
            lastTime = now;
        } else if (!timerId) {
            timerId = setTimeout(() => {
                func.apply(this, args);
                lastTime = Date.now();
                timerId = null;
            }, delay - timeSinceLastCall);
        }
    };
}

export function hexToBytes(hexString) {
    const bytes = [];
    for (let c = 0; c < hexString.length; c += 2) { bytes.push(parseInt(hexString.substr(c, 2), 16)); }
    return bytes;
}
