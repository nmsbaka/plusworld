/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

window.vnb = window.vnb || {};

/**
 * Handles the User Profile UI.
 */
vnb.UserPage = class {

  /**
   * Initializes the user's profile UI.
   * @constructor
   */

  constructor() {
    // Firebase SDK.
    this.database = firebase.database();
    this.auth = firebase.auth();
	var $_GET = this.$_GET();
    $(document).ready(() => {
      // DOM Elements.
      this.userAvatar = $('.profile-userpic .img-responsive');
      this.userUsername = $('.profile-usertitle-name');
      this.userLinkSettingProfile = $('.link-account-setting');
	  this.userTasks = $('.link-user-task');
	  this.position = $('profile-usertitle-job');
	
      // Event bindings.
      this.loadUser($_GET["uid"]);
    });
  }
  $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
  }

  /**
   * Displays the given user information in the UI.
   */
  loadUser(userId) {
	  
	if(userId == undefined && window.location.pathname.match(/profile/))
	{
		window.location.href = "http://"+window.location.hostname;
		return
	}
	
	if(userId == undefined){
		return
	}
    this.userId = userId;

    // Reset the UI.
    this.clear();

    // If users is the currently signed-in user we hide the "Follow" Checkbox.
    if (this.auth.currentUser && userId === this.auth.currentUser.uid) {
      this.userLinkSettingProfile.hide();
      this.userTasks.hide();
    } else {
      this.userLinkSettingProfile.show();
      this.userTasks.show();
    }

    // Load user's profile.
    vnb.firebase.loadUserProfile(userId).then(snapshot => {
      const userInfo = snapshot.val();
      if (userInfo) {
        this.userAvatar.attr('src',
            `${userInfo.profile_picture || 'https://lh3.googleusercontent.com/-Mbql_y7O1uU/V_jWZZ4dPeI/AAAAAAAFVJw/x3zTVFfRJgk/s0/user.png'}`);
        this.userUsername.text(userInfo.full_name || 'Anonymous');
		this.position.text(vnb.firebase.loadUserPosition(userInfo.position[0]));
      } else {
        var data = {
          message: 'This user does not exists.',
          timeout: 5000
        };
		window.location.href = "http://"+window.location.hostname;
      }
    });
  }

  /**
   * Clears the UI and listeners.
   */
  clear() {
    
  }

};

vnb.userPage = new vnb.UserPage();
