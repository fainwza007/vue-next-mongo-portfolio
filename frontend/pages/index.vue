<script setup>

useHead({
    title: 'Akarin Sangyor\'s portfolio',
    meta: [
        { name: 'description', content: 'Akarin Sangyor\'s portfolio' }
    ]
})

const experience = {
    "logo": "https://scontent.fbkk33-2.fna.fbcdn.net/v/t39.30808-6/441022336_948929743694348_6871846384715834951_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEh7KVQf6SbFfC6L_t6_F3jecoXES6Lq9B5yhcRLour0Lm0UvWEZuq2lad9slq6zzUymmRcASgJiG1R4WE6WE1u&_nc_ohc=P9OP5OgRF-UQ7kNvgHknc_Y&_nc_oc=AdkSZAR7Sz03ey_GtFe838dhcF5s2F1SHwyufJ_QhJqzxt1Jk7hye986j6kiSAQpnpU&_nc_zt=23&_nc_ht=scontent.fbkk33-2.fna&_nc_gid=_K-NrIBgXXMICfSmZmFRFw&oh=00_AYH5i5yqt8qSGjA5bFiinpuE270NuE3AwtWoq6qi1f5Wbw&oe=67F00F3E",
    "title": "Backend Developer",
    "company": "Dudee-Indeed Co.,Ltd",
    "type": "fulltime",
    "start": "2023-05-01T00:00:00+07:00",
    "end": null,
    "skills": [
        "NodeJS", "TypeScript", "JavaScript"
    ],
    "detail": "- Develop IOT SOLUTION ex. Locker With Employee RFID\n- หิวข้าวมาก"
}

</script>

<template>

    <section class="mb-10">
        <SkillList :skills="['a', 'b']" can-edit="true" @edit="console.log('can edit')"></SkillList>
    </section>

    <section class="mb-10">
        <ExperienceItem :experience="experience" />
    </section>

    <section class="mb-10">
        Portfolio List
    </section>

</template>