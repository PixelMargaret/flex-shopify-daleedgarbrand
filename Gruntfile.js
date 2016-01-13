module.exports = function (grunt) {
  grunt.initConfig({

    config: grunt.file.readJSON('shopify.json'),
    pkg: grunt.file.readJSON('package.json'),

    shopify: {
      options: {
        api_key: '<%= config.private_api %>',
        password: '<%= config.private_password %>',
        url: '<%= config.shop_url %>',
        theme: '<%= config.theme_id %>',
        base: './'
      }
    },

    notify: {
      shopify: {
        options: {
          title: 'Shopify',
          message: 'Files finished uploading.'
        }
      }
    },

    clean: ['./*.zip'],

    compress: {
      main: {
        options: {
          mode: 'zip',
          archive: './<%= pkg.name %>-v<%= pkg.version %>.zip'
        },
        files: [{
          src: [
            './assets/*',
            './config/*',
            './layout/*',
            './snippets/*',
            './templates/**/*',
            './locales/*'
          ]
        }]
      }
    },

    watch: {
      shopify: {
        files: [
          './assets/*',
          './config/*',
          './layout/*',
          './locales/*',
          './snippets/*',
          './templates/**/*'
        ],
        tasks: ['shopify','notify']
      }
    }
  });

  // Load Grunt tasks
  require('load-grunt-tasks')(grunt);

  // Register Grunt tasks
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('deploy', ['shopify:upload']);
  grunt.registerTask('build', ['clean','compress']);
};
