const faker = require('faker/locale/fr')

module.exports = {
    generateFakeTemplates: function(total) {
        const templates = []

        for (let i = 0; i < total; i++) {
            templates.push({
                active: faker.random.boolean(),
                author: {
                    firstname: faker.name.firstName(),
                    lastname: faker.name.lastName(),
                    username: faker.internet.userName(),
                    image: faker.random.image()
                },
                colors: {
                    primaryColor: faker.internet.color(),
                    secondaryColor: faker.internet.color(),
                    tertiaryColor: faker.internet.color(),
                    backgroundColor: faker.internet.color(),
                    textColor: faker.internet.color()
                }
            })
        }

        return templates
    },
    generateFakeResumes: function(total) {
        const resumes = []

        for (let i = 0; i < total; i++) {
            const totalEducations = faker.random.number({ min: 0, max: 5 })
            const totalWorkExperience = faker.random.number({ min: 0, max: 5 })

            const educations = []
            for (let i = 0; i < totalEducations; i++) {
                const education = {
                    title: faker.lorem.word(),
                    description: faker.lorem.sentences(),
                    school: faker.lorem.words(),
                    city: faker.address.city(),
                    country: faker.address.country(),
                    start_date: faker.date.between('2015-01-01', '2019-01-01'),
                    end_date: faker.date.recent(),
                    position: {
                        lat: faker.address.latitude(),
                        lng: faker.address.longitude()
                    }
                }
                educations.push(education)
            }

            const work_experiences = []
            for (let i = 0; i < totalWorkExperience; i++) {
                const work_experience = {
                    job_title: faker.name.jobTitle(),
                    job_description: faker.lorem.sentences(),
                    company: faker.company.companyName(),
                    city: faker.address.city(),
                    country: faker.address.country(),
                    start_date: faker.date.between('2015-01-01', '2019-01-01'),
                    end_date: faker.date.recent(),
                    position: {
                        lat: faker.address.latitude(),
                        lng: faker.address.longitude()
                    }
                }
                work_experiences.push(work_experience)
            }

            resumes.push({
                user_id: faker.random.uuid(),
                slug: faker.random.uuid(),
                job_title: faker.name.jobTitle(),
                job_description: faker.lorem.sentences(),
                active: faker.random.boolean(),
                education: educations,
                work_experience: work_experiences,
				// password: faker.internet.password(),
				password: 'secret'
            })
        }

        return resumes
    }
}
