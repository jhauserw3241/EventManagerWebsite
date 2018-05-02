export function formatTagsForDatabase(tags) {
    return tags.map(tag => {
        return tag.text;
    });
}

export function formatListAsTags(list) {
    return list.map(item => {
        return {
            id: item,
            text: item,
        };
    });
}