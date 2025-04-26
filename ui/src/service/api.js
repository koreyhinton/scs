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

const storyShareNew = async function() {
    var storyData = textInputsModal("collect", "story");
    var storyShareData = textInputsModal("collect", "storyShare");

    storyData['id'] = null;
    storyData['password_hash'] = '';
    storyData['is_private'] = false;
    storyData['global_storyid'] = crypto.randomUUID();

    var userName = userList("collect");
    var userId = await fetch('cgi-bin/users').filter(u => u.Name == "userName").id;

    storyShareData['id'] = null;
    storyShareData['userid'] = userId;
    storyData['authorid'] = userId;

    if (storyShareData['is_illustrator'] != "") {
        storyShareData['is_illustrator'] = true;
        storyShareData['default_illustrator_id'] = userId;
    }
    if (storyShareData['is_composer'] != "") {
        storyShareData['is_composer'] = true;
        storyShareData['default_composer_id'] = userId;
    }

    var data = {
        story: storyData,
        storyShare: storyShareData
    };
    await fetch('cgi-bin/story-share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
};
