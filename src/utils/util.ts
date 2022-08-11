export const setClass = (
    styles: { [className: string]: string },
    classes: string[],
    conditions?: [string, boolean][]
) => {
    const returnArray = classes.map((className) => styles[className]);

    conditions?.forEach((condition) => {
        const _class = condition[0];
        const _condition = condition[1];

        if (_condition) {
            returnArray.push(styles[_class]);
        }
    });

    return returnArray.join(' ');
};
