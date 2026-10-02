function shuffle(array) {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}


function createFromList(list) {
    return shuffle(list);
}


function createCombination(...lists) {
    const combinations = [];

    function build(index, current) {

        if (index === lists.length) {
            combinations.push(current.join(""));
            return;
        }

        for (const item of lists[index]) {
            build(
                index + 1,
                [...current, item]
            );
        }
    }

    build(0, []);

    return shuffle(combinations);
}