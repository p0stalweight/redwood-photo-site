// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Private } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Private unauthenticated="home">
        <Route path="/gallery-edit" page={GalleryEditPage} name="galleryEdit" />
        <Route path="/manage-galleries" page={ManageGalleriesPage} name="manageGalleries" />
        <Route
          path="/admin/gallery-upload"
          page={AdminGalleryUploadPage}
          name="adminGalleryUpload"
        />
        <Route
          path="/admin/photos/new"
          page={AdminNewPhotoPage}
          name="adminNewPhoto"
        />
        <Route
          path="/admin/photos/{id:Int}/edit"
          page={AdminEditPhotoPage}
          name="adminEditPhoto"
        />
        <Route
          path="/admin/photos/{id:Int}"
          page={AdminPhotoPage}
          name="adminPhoto"
        />
        <Route path="/admin/photos" page={AdminPhotosPage} name="adminPhotos" />
        <Route
          path="/admin/galleries/new"
          page={AdminNewGalleryPage}
          name="adminNewGallery"
        />
        <Route
          path="/admin/galleries/{id:Int}/edit"
          page={AdminEditGalleryPage}
          name="adminEditGallery"
        />
        <Route
          path="/admin/galleries/{id:Int}"
          page={AdminGalleryPage}
          name="adminGallery"
        />
        <Route
          path="/admin/galleries"
          page={AdminGalleriesPage}
          name="adminGalleries"
        />
      </Private>
      <Route path="/" page={HomePage} name="home" />
      <Route path="/about" page={AboutPage} name="about" />
      <Route path="/contact" page={ContactPage} name="contact" />
      <Route path="/galleries/{id:Int}" page={GalleryPage} name="gallery" />
      <Route
        path="/galleries/{galleryId:Int}/photos/{order:Int}"
        page={GalleryPhotoPage}
        name="galleryPhoto"
      />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
