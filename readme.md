Step1: Setup ffmpeg on your local machine



 -loglevel error (to troubleshoot errors)
   -stats (provides progess status in terminal window)
   -i infile (source video to transcode)
   -map 0:0 (specify each stream in the original to map to output)
   -filter:v fps\=24000/1001 (framerate of 23.976, like source)
   -c:v h264_videotoolbox (encoder)
   -b:v (set bitrate, here I chose 8500k) 
   -profile 3 -level 41 (h264 profile high, level 4.1)
   -coder cabac (cabac coder chosen)
   -threads 4  (limit of 4 cpu threads, of 8 on this laptop)
   -allow_sw:v 1  (using VideoToolbox software encoding for accleration; GPU is not enabled)
   -map 0:1 -c:a:0 copy -disposition:a:0 default (copies audio stream over, unchanged, as default audio)
   -map 0:6 -c:s:0 copy -disposition:s:0 0 (copies subtitle stream over, not as default ... ie, will play subtitles automatically)
   -metadata:g (global metadata, you can reflect filename in metadata)
   -default_mode passthrough (allow audio w/o further processing) 
    outfile (NOTE: no dash precedes filename/path. Chose mkv format to
   hold my multiple streams; mp4 or other formats work just fine ... as
   long as contents are appropriate for format.)