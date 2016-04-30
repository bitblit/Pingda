module.exports = function(grunt) {

    grunt.initConfig({
        clean: ["dist"],
        simplemocha: {
            options: {
                globals: ['expect'],
                timeout: 3000,
                ignoreLeaks: false,
                bail: false,
                slow: 1000,
                fullTrace: true,
                ui: 'bdd',
                reporter: 'mocha-circleci-reporter'
            },
            all: {src: ['test/*.js']}
        },
        lambda_invoke: {
            default: {
                options: {
                    // Task-specific options go here.
                }
            }
        },
        lambda_package: {
            default: {
                options: {
                    // Task-specific options go here.
                }
            }
        },
        lambda_deploy: {
            default: {
                arn: 'arn:aws:lambda:us-east-1:YOUR_ACCOUNT_ID:function:pingda',
                options: {
                    timeout: 10,
                    memory: 128
                    // Task-specific options go here.
                }
            }
        },
        jshint: {
            files: ['*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-aws-lambda');
    grunt.loadNpmTasks('grunt-simple-mocha');

    // SimpleMocha tests the services, lambda_invoke tests the lambda function
    // Taking out lambda_invoke for now since it requires S3 privs that circleCI doesnt have yet
    grunt.registerTask('default', ['clean','lambda_package','jshint','simplemocha']);
    grunt.registerTask('ldeploy', ['clean','lambda_package', 'lambda_deploy']);

};