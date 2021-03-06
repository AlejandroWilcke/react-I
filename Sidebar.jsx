import React from 'react';

export default ({ deselectAlbum }) => (
  <div className="col-xs-2">
      <sidebar>
        <img src="juke.svg" className="logo" />
        <section>
          <h4 className="menu-item active">
            <a onClick={deselectAlbum} href="#">ALBUMS</a>
          </h4>
        </section>
      </sidebar>
    </div>
);