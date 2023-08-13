def generate_all_comic_scenes(comic_strip_response):
    threads = []
    
    for description in comic_strip_response:
        thread = threading.Thread(target=generate_comic_strip_for_single_prompt, args=(description,))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()