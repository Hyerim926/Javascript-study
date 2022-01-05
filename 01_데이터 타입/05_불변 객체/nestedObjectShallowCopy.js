var user = {
    name: 'hey',
    urls: {
        portfolio: 'http://github.com/abc',
        blog: 'http://blog.com',
        facebook: 'http://facebook.com/abc'
    }
};

var user2 = copyObject(user);

user2.name = 'forest';
console.log(user.name === user2.name); // false

user.urls.portfolio = 'http://portfolio';
console.log(user.urls.portfolio === user2.urls.portfolio); // false

user.urls.blog = '';
console.log(user.urls.blog === user2.urls.blog); // true