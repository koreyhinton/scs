window.MyJavascriptInterface = {
    retrieveBookmark: function(storyId) {
        return '0,0,foo';
    },
    showToast: function() {
        return '1+Story Name A|2+Story Name B|3+Story Name C';
    },
    retrieveProgress: function(id) {
        if (id=='1')return '4|1';
        if (id=='2')return '5|0.5';
        return '10|0.01';
    },
    retrieveSoundPreference: function() {
        return '100|100|100';
    },
};
