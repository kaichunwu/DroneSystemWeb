module.exports = [{
    roles: 'user',
    allows: [
        {resources: ['/'], permissions: ['get','post']},
        {resources: ['/users'], permissions: ['get','post']},
        {resources: ['/users/data'], permissions: ['get','post']},
        {resources: ['/users/addTask'], permissions: ['get','post']},
        {resources: ['/users/submitTask'], permissions: ['get','post']},
    ]
},{
    roles: 'admin',
    allows: [
        {resources: ['/'], permissions: ['get','post']},
        {resources: ['/users'], permissions: ['get','post','delete']},
        {resources: ['/admin'], permissions: ['get','post','delete']},
    ]
},{
    roles: 'supervisor',
    allows: [
        {resources: ['/'], permissions: ['get','post']},
        {resources: ['/users'], permissions: ['get','post','delete']},
        {resources: ['/admin'], permissions: ['get','post','delete']},
        {resources: ['/supervisor'], permissions: ['get','post','delete']},
    ]
}]
