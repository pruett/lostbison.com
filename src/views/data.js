module.exports = {
  www: {
    description: "description for www site",
    author: "Kevin Pruett",
    title: "title for www site",
    navItems: [
      {
        link: 'Philosophy',
        href: '/philosophy'
      },
      {
        link: 'Team',
        href: '/team'
      },
      {
        link: 'Build',
        href: '/build'
      }
    ],
    teamMembers: [
      {
        name: 'Kevin Pruett',
        img_src: 'images/team/kp.jpg',
        blurb: 'This is a blurb about me',
        role: 'developer/designer',
        location: 'Hoboken, NJ',
        links: ['http://kevinpruett.com', 'https://twitter.com/pruett']
      },
      {
        name: 'Matt Ortega',
        img_src: 'images/team/mo.jpg',
        blurb: 'Vestibulum id ligula porta felis euismod semper. Nullam id dolor id nibh ultricies vehicula ut id elit. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Etiam porta sem malesuada magna mollis euismod.',
        role: 'designer/front-end developer',
        location: 'Brooklyn, NY',
        links: ['http://matthewortega.co', 'https://twitter.com/matt0rtega']
      }
    ]
  },

  blog: {
    description: "blog desc",
    author: "Kevin Pruett",
    title: "not another agency blog"
  }
}
