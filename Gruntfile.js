module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            files: ['mobap/**/*.js'],
            options: {
                jshintrc: '/Users/heimusu/.jshintrc',
            }
        },
        watch: {
            files: ['mobap/**/*.js'],
            tasks: ['jshint'],
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
