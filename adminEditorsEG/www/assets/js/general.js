'use strict';

let apiService = new ApiService(window.env == 'isProd' ? window.DEV_API[0] : window.LOCAL_API[0]);

class Posts {
	constructor(apiService) {
      this.showDirs = this.showDirs.bind(this);
      this.showMd = this.showMd.bind(this);
   }
   showDirs() {
      // render folders list
		let listTemp = '';
      return apiService.getDirsList()
      	.then(posts => {
      		posts.data.forEach(el => {
                listTemp += '<div class="blog-item"><div class="d-flex"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26" version="1.1" width="20px" height="20px"><g id="surface1"><path style=" " d="M 3 2 C 1.34375 2 0 3.34375 0 5 L 0 22 C 0 23.65625 1.34375 25 3 25 L 23 25 C 24.65625 25 26 23.65625 26 22 L 26 8 C 26 6.34375 24.65625 5 23 5 L 11 5 C 11 3.34375 9.65625 2 8 2 Z M 3 7 L 23 7 C 23.550781 7 24 7.449219 24 8 L 24 22 C 24 22.550781 23.550781 23 23 23 L 3 23 C 2.449219 23 2 22.550781 2 22 L 2 8 C 2 7.449219 2.449219 7 3 7 Z "/></g></svg><span>'+el+'</span></div></div>';
            });
      		$('.blog-list-wrap').append(listTemp);
      	});
   }

   showSubDirs(id) {
      // render sub folders list
      let listTemp = '';
      return apiService.getSubDirsList(id)
         .then(dirs => {
            dirs.data.forEach(el => {
               listTemp += '<li>'+el+'</li>';
            });
            $('.blog-item.active').append('<ul>' + listTemp + '</ul>');
         });
   }

   showMd(id, pathPrefix) {
   	// render .md file content in textarea
   	apiService.getPostMd(id, pathPrefix)
   		.then(post => {
   			console.info('data', post.data);
   			myCodeMirror.setValue(post.data);
   		});
   }

   saveMd(id, md, pathPrefix) {
   	// render .md file content in textarea
   	return apiService.savePostMd(id, md, pathPrefix);
   }

   addPost(id) {
      // render .md file content in textarea
      return apiService.createPost(id);
   }
}