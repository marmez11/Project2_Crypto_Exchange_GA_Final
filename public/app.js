function deletePrompt(){	 
      if (confirm("Are you sure you want to delete this entry?") == true) {
        location.href = '/';
      } else {
        event.preventDefault();
      }
  }