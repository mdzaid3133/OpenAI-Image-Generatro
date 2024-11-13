const getAllPosts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/post', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // Filter posts for only the current user
            const userPosts = response.data?.posts?.filter(post => post?.createdBy === storedUser?._id) || [];
            setPosts(userPosts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

      // Fetch posts whenever storedUser changes
      useEffect(() => {
        if (storedUser) {
            getAllPosts();
        }
    }, []);