import React from 'react'

function ProfileImage(props) {
    return (
        <Image
            cloud_name={'projekiso'}
            publicId={'user/profiles/' + props.publicId}
            fetch-format="auto"
            quality="auto"
            className={props.className}
          />
    )
}

export default ProfileImage
