var config = require("./config");
var _ = require("underscore");
var mongoose = require("mongoose");
var Page = require('../models/page');
var Layout = require('../models/layout');
var Menu = require('../models/menu');
var User = require('../models/user');
var Category = require('../models/category');
module.exports = {
    connect: function (cb) {
        mongoose.connect(config.database.host + "/" + config.database.dbname);
        this.connection = mongoose.connection;
        this.connection.on('error', cb);
        this.connection.on('open', cb);
    },

    setup: function () {
        var layoutElements = [];

        Layout.count({}, function (err, result) {
            if (err) throw err;
            if (result === 0) {
                console.log("prefill database");
                var user = new User({name: 'admin', password: 'admin', role: 'admin'});
                user.save(function (err) {
                    if (err) throw err;
                });

                var page = new Page({
                    slug: 'start',
                    date: new Date(),
                    content: '<p><span style="color: rgb(0, 0, 0);text-align: justify;float: none;background-color: rgb(255, 255, 255);"><span style="color: rgb(102, 102, 102);text-align: left;float: none;background-color: rgb(255, 255, 255);">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.</span></span></p><p><span style="color: rgb(102, 102, 102);">In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,</span></p><p><br/><img src="http://lorempixel.com/g/400/200/"/><br/></p><p><span style="color: rgb(102, 102, 102);"><br/></span></p><p><span style="color: rgb(102, 102, 102);">In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,</span></p>',
                    title: 'Start',
                    type: 'page'
                });

                page.save(function (err) {
                    if (err) throw err;
                });

                var page1 = new Page({
                    slug: 'page1',
                    date: new Date(),
                    title: 'Page1',
                    type: 'post'
                });

                page1.save(function (err) {
                    if (err) throw err;
                });

                var category = new Category({
                    slug: 'blog',
                    title: 'Blog',
                    pages: [page, page1]
                });

                category.save(function (err) {
                    if (err) throw err;
                });

                var menu = new Menu({
                    title: 'toolbar-menu',
                    items: [
                        {
                            title: 'page1',
                            path: 'http://localhost:63342/node-rest-cms/frontend/src/index.html#/page/page1'
                        },
                        {
                            title: 'Blog',
                            path: 'http://localhost:63342/node-rest-cms/frontend/src/index.html#/category/blog'
                        }
                    ]
                });

                menu.save(function (err) {
                    if (err) throw err;
                });

                layoutElements.push(new Layout({
                    name: 'toolbar',
                    content: 'NODE CMS',
                    items: [menu]
                }));

                layoutElements.push(new Layout({
                    name: 'sidebar-left'
                }));

                layoutElements.push(new Layout({
                    name: 'footer'
                }));

                for (var i = 0; i < layoutElements.length; i++)
                    layoutElements[i].save(function (err, l) {
                        if (err) throw err;
                    });
            }
        });
    }

};