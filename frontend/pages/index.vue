<script setup>
import { useAuthStore } from '@/stores/auth'
import { useProfileStore } from '@/stores/profile'

const authStore = useAuthStore()
const store = useProfileStore()

useHead({
    title: 'Akarin Sangyor\'s portfolio',
    meta: [
        { name: 'description', content: 'Akarin Sangyor\'s portfolio' }
    ]
})

// const experiences = [{
//     "logo": "https://scontent.fbkk33-2.fna.fbcdn.net/v/t39.30808-6/441022336_948929743694348_6871846384715834951_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEh7KVQf6SbFfC6L_t6_F3jecoXES6Lq9B5yhcRLour0Lm0UvWEZuq2lad9slq6zzUymmRcASgJiG1R4WE6WE1u&_nc_ohc=P9OP5OgRF-UQ7kNvgHknc_Y&_nc_oc=AdkSZAR7Sz03ey_GtFe838dhcF5s2F1SHwyufJ_QhJqzxt1Jk7hye986j6kiSAQpnpU&_nc_zt=23&_nc_ht=scontent.fbkk33-2.fna&_nc_gid=_K-NrIBgXXMICfSmZmFRFw&oh=00_AYH5i5yqt8qSGjA5bFiinpuE270NuE3AwtWoq6qi1f5Wbw&oe=67F00F3E",
//     "title": "Backend Developer",
//     "company": "Dudee-Indeed Co.,Ltd",
//     "type": "fulltime",
//     "start": "2023-05-02T00:00:00+07:00",
//     "end": "2024-11-01T00:00:00+07:00",
//     "skills": [
//         "NodeJS", "TypeScript", "JavaScript"
//     ],
//     "detail": "- Develop IOT SOLUTION ex. Locker With Employee RFID\n- หิวข้าวมาก"
// }, {
//     "logo": "https://scontent.fhdy2-1.fna.fbcdn.net/v/t39.30808-6/305121320_466012415541399_848185678035700082_n.png?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHNaHUAAi29yTwuq8wbn07JIZXLFs04UYYhlcsWzThRhq5WyZqGU0FsrnfalOpHDQf_yh32reR8mnZLswh7brmy&_nc_ohc=orcvvmPi_4AQ7kNvgHTvjhM&_nc_oc=AdlsKRSeAh0AP8tOMdvzxbxqi1u5J9i5iTPHqVIBad0n_q7qw6b4BSCMqA5CPizcwCiUUeooZs_YbnUhR5DKYaQz&_nc_zt=23&_nc_ht=scontent.fhdy2-1.fna&_nc_gid=hle2390otsN_WwfQSWwrWw&oh=00_AYE8-6XLDP3zHLRHpsN1l669F7ljUlSgrbTet-WN6Vi2Iw&oe=67F1DF8B",
//     "title": "Backend Developer",
//     "company": "Ever Medical Technologies",
//     "type": "fulltime",
//     "start": "2024-11-02T00:00:00+07:00",
//     "end": null,
//     "skills": [
//         "NodeJS", "TypeScript", "JavaScript", "NestJS", "Moleculer", "Docker"
//     ],
//     "detail": "- Develop HIS FOR VAJIRA HOSPITAL"
// }]


// const portfolios = [{
//     "id": "65f3b27c8d4f2e3a1c0d9a7b",
//     "cover": "https://th.airportels.asia/wp-content/uploads/sites/2/2019/12/E-commerce-online-shopping.jpg",
//     "images": [
//         "https://www.paymentscardsandmobile.com/wp-content/uploads/2017/10/Global-B2C-e-commerce-market-1.jpg",
//         "https://gentech.id/wp-content/uploads/2024/07/COVID-19-1-2-1024x724.jpg",
//         "https://lh4.googleusercontent.com/7qyRstA9KwL-omYw_-xYwgm93gVItoXneuHStpARA3pT49uTEAs3kY4aVroqW3Gd2f8QMPhAihRgB7toCO_RpPc08DJVCSktMdL55Jr7lR4qAJ09881AIzCZZCyY8u9tHkktUNwO"
//     ],
//     "skills": ["React", "Node.js", "MongoDB", "Express"],
//     "title": "E-Commerce Platform Redesign",
//     "content": "Completely redesigned the user experience for an e-commerce platform serving over 50,000 monthly users. Implemented a microservices architecture that reduced page load times by 40% and increased conversion rates by 15%.",
//     "excerpt": "A complete overhaul of an e-commerce platform with improved performance and user experience.",
//     "publishedAt": "2025-01-15T14:30:00.000Z"
// },]

function isExperienceVisible(index) {
    return true
}

const limit = 2
const currentPortfoliosPage = ref(1)

await store.getProfile()
await store.getPortfolios(currentPortfoliosPage.value, limit)

const onPortfoliosMore = async () => {
    const nextPage = currentPortfoliosPage.value + 1;

    await store.getPortfolios(nextPage, limit)

    currentPortfoliosPage.value = nextPage
}
</script>

<template>

    <section class="mb-10">
        <BaseEditable :edit-mode="store.skillsEditMode">
            <template #view>
                <SkillList :skills="store.profile.overallSkills" :can-edit="authStore.canEdit"
                    @edit="store.enterSkillsEditMode">
                </SkillList>
            </template>
            <template #edit>
                <SkillForm :skills="store.profile.overallSkills" @submit="store.saveSkills"
                    @cancel="store.enterSkillsViewMode" />
            </template>
        </BaseEditable>


    </section>

    <section class="mb-10">
        <BaseEditable :edit-mode="store.experiencesEditMode">
            <template #view>
                <ExperienceList :experiences="store.profile.experiences" :can-edit="authStore.canEdit"
                    :has-more-experiences="store.hasMoreExperiences" :is-experience-visible="store.isExperienceVisible"
                    @edit="store.enterExperiencesEditMode" @more="store.increaseVisibleExperiences(8)" />
            </template>
            <template #edit>
                <ExperienceForm :experiences="store.profile.experiences" @cancel="store.enterExperiencesViewMode"
                    @submit="store.saveExperiences" />
            </template>
        </BaseEditable>
    </section>
    <section class="mb-10">
        <PortfolioList :portfolios="store.portfolios" :can-edit="authStore.canEdit"
            :is-getting-portfolios="store.isGettingPortfolios" :has-more-portfolios="store.hasMorePortfolios"
            @more="onPortfoliosMore" />

    </section>
    <!-- <section class="mb-10"> -->
    <!-- <ExperienceItem :experience="experience" /> -->
    <!-- <ExperienceList :experiences="experiences" :can-edit="true" :has-more-experiences="true"
            :is-experience-visible="isExperienceVisible" @edit="console.log('edit event')"
            @more="console.log('more event')" />
    </section> -->

    <!-- <section class="mb-10">
        <PortfolioList :portfolios="portfolios" :can-edit="true" :is-getting-portfolios="false"
            has-more-portfolios="true" @more="console.log('clicked on more')"></PortfolioList>
    </section> -->

</template>