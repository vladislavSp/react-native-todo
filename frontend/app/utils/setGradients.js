export const gradientsMain = [
    {
        bg1: '#A32FFF',
        bg2: '#7000FF',
    }, {
        bg1: '#FE0000',
        bg2: '#FE7B01',
    }, {
        bg1: '#FFB627',
        bg2: '#FF8413',
    }
];

export const setGradients = (index = 0, gradients = gradientsMain) => {
    let i = index;
    const gradientLength = gradients.length;
    const n = Math.floor(index / gradientLength);

    if (index >= gradientLength) {
        i = index - (gradientLength * n);
        return gradients[i];
    }

    return [gradients[i].bg1, gradients[i].bg2];
};

export default setGradients;
