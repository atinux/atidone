export default defineWebSocketHandler({
  async upgrade(request) {
    const { user } = await requireUserSession(request)

    // return {
    //   durableInstanceName: `${user.id}`
    // }
  },
  async open(peer) {
    const { user } = await requireUserSession(peer)
    console.log('opening', peer)
    console.log('peers', peer.peers.size)
    peer.subscribe(`${user.id}`)
  },
  async close(peer) {
    const { user } = await requireUserSession(peer)
    console.log('closing', peer)
    peer.unsubscribe(`${user.id}`)
  }
})
