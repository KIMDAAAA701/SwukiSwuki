//https://ckeditor.com/docs/ckeditor4/latest/guide/plugin_sdk_sample_1.html
CKEDITOR.plugins.add( 'abbr', {
    icons: 'abbr',
    init: function( editor ) {
        // Plugin logic goes here..
        editor.ui.addButton( 'Abbr', {
            label: 'Insert Abbreviation',
            command: 'abbr',
            toolbar: 'insert'
        });
        // config.extraPlugins = 'abbr';
    }
});

