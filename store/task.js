export const state = () => ({
    total: 0,
    list: [
        {
            id: 1,
            name: 'Buying Vegetables',
            description:"Lorem ipsum dolor sit amet",
            time: '08:30 PM',
            place: 'Pasar Induk',
            status:true
        },
        {
            id: 2,
            name: 'Meeting',
            time: '12:00 PM',
            description:"Lorem ipsum dolor sit amet",
            place: 'Workplace Floor 1',
            status:false
        },
    ]
})

export const mutations = {
    add(state,obj) {
        state.total++
        state.list.push(obj)
        console.log("Added")
    }
}