export default Object.freeze({
  data: [
    {
      dayOfWeek: 'sun',
      trainings: [
        {
          period: 'morning',
          training: {
            id: '1',
            name: 'Quest 1',
            category: 'AEROBIC',
            description: 'Quest 1 description',
            duration: 18,
            classification: 'GOLD',
            xp: 80,
            unlockXp: 80,
            exercises: ['ex 1'],
            status: 'uncompleted',
          },
        },
      ],
    },
  ],
  status: 200,
})
