import React from 'react'
import glMatrix, {vec3} from 'gl-matrix'

// props passed from Room (or 'Scene') component

// IDEA: avatars are orbs with dedicated lights
	// light is what changes based on sentiment: glowing orbs

// state -- where all avatars will be
// props -- what component type avatars should be
// receives user roster
const avatarRadius = 1.75
    , avatarCircleRadius = 8
    , cameraToCenter = vec3.fromValues(0, 0, -avatarCircleRadius)
	, centerOfConversation = [0, 1.600000023841858, -8]

const positionOfAvatar = (index, totalCount, center, out) => {
  const angle = (index / totalCount) * 2 * Math.PI
      , hand = [0, 0, 0]
  vec3.rotateY(hand, cameraToCenter, [0, 0, 0], angle)
  // console.log("hand", hand)
  return vec3.sub(out, center, hand)
}

function makeAvatars(roster = {}, center = centerOfConversation) {
	console.log('MAKE-AVATARS is being called', 'ROSTER: ', roster)
	var userIds = Object.keys(roster)
	return userIds.map((userId, i) => ({
		position: positionOfAvatar(i, userIds.length, center, [0, 0, 0]),
		userId,
		sentiment: roster[userId]
	}))
}

export default class Avatars extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			avatars: makeAvatars(props.roster)
		}
	}

	componentWillReceiveProps(incomingProps) {
		this.setState({
			avatars: makeAvatars(incomingProps.roster, incomingProps.center)
		})
	}

	render() {
		const Avatar = this.props.Avatar 
		const avatars = this.state.avatars

		if (!avatars) return null

		return (
			<a-entity>
				{ avatars
					.map((props, index) =>
							index
							? <Avatar key={props.userId} {...props} {...this.state} {...this.props} />
							: null)
				}
			</a-entity>
		)
	}
}



