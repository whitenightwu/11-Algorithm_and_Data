try {
    var storage = window.localStorage;
    if (storage && storage.removeItem) {
        var time = new Date().getTime();
        storage.setItem('___ds_storage__usehttps', '1|' + time);
    }
}
catch (e) {
}