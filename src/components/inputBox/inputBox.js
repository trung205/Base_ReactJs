function InputBox(props) {
    const {currentUser, onChange, value, sendPost, type} = props
    return (
        <div class="major-padding input-group">
          <div class="input-group-addon">
            <img
              src={currentUser && currentUser.profilePic}
              class="avatar-without-margin"
              alt="avatar"
            />
          </div>
  
          <input
            
            onChange={onChange}
            class="form-control"
            placeholder={
              type === 'reply'
                ? 'Type your reply here...'
                : 'Type your comment here...'
            }
            value={value}
            onKeyDown={event => {
              if (event.keyCode === 13) sendPost();
            }}
          />
          <span class="input-group-addon">
            <i class="glyphicon glyphicon-camera" />
          </span>
        </div>
      );
}

export default InputBox;