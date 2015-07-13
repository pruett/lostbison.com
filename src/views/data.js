module.exports = {
  www: {
    description: "description for www site",
    author: "Kevin Pruett",
    title: "title for www site",
    navItems: [
      {
        link: 'About',
        href: '/about'
      },
      {
        link: 'Process',
        href: '/process'
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
        blurb: 'I like turtles',
        location: {
          name: 'Hoboken, NJ',
          img_src: 'images/team/hoboken.png'
        }
      },
      {
        name: 'Matt Ortega',
        img_src: 'images/team/mo.jpg',
        blurb: 'I like frogs',
        location: {
          name: 'Brooklyn, NY',
          img_src: 'images/team/hoboken.png'
        }
      }
    ]
  },

  blog: {
    description: "blog desc",
    author: "Kevin Pruett",
    title: "not another agency blog"
  }
}
