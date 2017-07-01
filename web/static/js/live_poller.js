// Import the Socket calls from phoenix.js
import { Socket } from "phoenix"

export class LivePoller {
  constructor() {
    // If the element we're expecting doesn't exist on the page,
    // just exit out of the whole thing
    if (!$("#poll-id").length) { return }
    // Set up our channel for Polls
    let pollChannel = this._setupPollChannel()
  }
  _createSocket() {
    // Open up a new websocket connection
    let socket = new Socket("/socket")
    // And then connect to it
    socket.connect()
    // When we successfully open the connection, log out to the console that
    // we succeeded.
    socket.onOpen(() => console.log("Connected"))
    // And return out the socket
    return socket
  }
  _setupPollChannel() {
    // Call our createSocket() function above and store the created socket
    let socket = this._createSocket()
    // And grab the id of the poll we're subscribing to
    let pollId = $("#poll-id").val()
    // Next, specify that we want to join a polls channel of the polls: with the poll id.
    // Remember our code in PollChannel.ex that looked like: "polls:" <> poll_id
    let pollChannel = socket.channel("polls:" + pollId)
    // Finally, join the channel we created. On success, let the console know that we joined.
    // On failure, tell us why it errored out.
    pollChannel
      .join()
      .receive("ok", resp => { console.log("Joined") })
      .receive("error", reason => { console.log("Error: ", reason) })
    // Finally, return the whole channel we've created; we'll need that to push
    // messages out later.
    return pollChannel
  }
}
