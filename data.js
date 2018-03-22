function getBloomData() {

    var bloomPromise = jQuery.Deferred();




    $.get("https://apps.tlt.stonybrook.edu/gproxy/?id=1paDFGUTPZeBcbdWtxD5x8IIQGG8TJqMiI8uNpytUCgU&gid=1755631183", function (data) {
        var bloomData = $.csv.toObjects(data);
        bloomPromise.resolve(bloomData)

    });

    return bloomPromise.promise()
}
