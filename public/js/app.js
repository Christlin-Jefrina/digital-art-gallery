const app = angular.module('digitalArtApp', []);

app.controller('ArtworkController', function($scope, $http) {
  $scope.artworks = [];

  // Fetch artworks from the server
  $http.get('/api/artworks').then(function(response) {
    $scope.artworks = response.data;
  });

  // Add a new artwork
  $('#addArtworkForm').submit(function(event) {
    event.preventDefault();
    const artworkData = {
      title: $('#title').val(),
      artist: $('#artist').val(),
      description: $('#description').val(),
      imageURL: $('#imageURL').val(),
    };

    $http.post('/api/artworks', artworkData).then(function(response) {
      $scope.artworks.push(response.data);
      $('#artworkModal').hide();
    });
  });

   // Delete an artwork
   $scope.deleteArtwork = function(id) {
    if (confirm('Are you sure you want to delete this artwork?')) {
      $http.delete('/api/artworks/' + id).then(function(response) {
        // Remove the deleted artwork from the artworks array
        $scope.artworks = $scope.artworks.filter(function(artwork) {
          return artwork._id !== id;
        });
        alert('Artwork deleted successfully');
      }, function(error) {
        alert('Error deleting artwork');
      });
    }
  };

   // Modal open/close functionality
   $('#addArtworkBtn').click(function() {
    $('#artworkModal').show(); // Show modal on click
});

$('#closeModal').click(function() {
    $('#artworkModal').hide(); // Hide modal on close
});

// Optionally hide the modal when clicking outside the modal content
$(window).click(function(event) {
    if ($(event.target).hasClass('modal')) {
        $('#artworkModal').hide();
    }
});

});
