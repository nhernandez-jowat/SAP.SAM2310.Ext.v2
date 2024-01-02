export default function ExcludeSelectExpandOptions(query) {
    return query.replace(/&?(\$select=)(\w+,?)+/, '').replace(/&?(\$expand=)(\w+,?)+/, '');
}
