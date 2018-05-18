<?php

include_once('../api/dan-lib.php');

function rmdir_recursive($dir) {
    foreach(scandir($dir) as $file) {
       if ('.' === $file || '..' === $file) continue;
       if (is_dir("$dir/$file")) rmdir_recursive("$dir/$file");
       else unlink("$dir/$file");
   }

   rmdir($dir);
}

if(isset($_FILES["zip_file"])) {
    if($_FILES["zip_file"]["name"]) {
        $filename = $_FILES["zip_file"]["name"];
        $source = $_FILES["zip_file"]["tmp_name"];
        $type = $_FILES["zip_file"]["type"];
    
        $name = explode(".", $filename);
        $accepted_types = array('application/zip', 'application/x-zip-compressed', 'multipart/x-zip', 'application/x-compressed');
        foreach($accepted_types as $mime_type) {
            if($mime_type == $type) {
                $okay = true;
                break;
            } 
        }
    
        $continue = strtolower($name[1]) == 'zip' ? true : false;
        if(!$continue) {
            $message = "The file you are trying to upload is not a .zip file. Please try again.";
        }
    
      /* PHP current path */
      $path = dirname(__FILE__).'/';  // absolute path to the directory where zipper.php is in
      $filenoext = basename ($filename, '.zip');  // absolute path to the directory where zipper.php is in (lowercase)
      $filenoext = basename ($filenoext, '.ZIP');  // absolute path to the directory where zipper.php is in (when uppercase)
    
      $targetdir = $path . 'tmp'; // target directory
      $targetzip = $path . $filename; // target zip file
    
      /* create directory if not exists', otherwise overwrite */
      /* target directory is same as filename without extension */
    
      if (is_dir($targetdir))  rmdir_recursive ( $targetdir);
    
    
      mkdir($targetdir, 0777);
    
    
      /* here it is really happening */
    
        if(move_uploaded_file($source, $targetzip)) {
            $zip = new ZipArchive();
            $x = $zip->open($targetzip);  // open the zip file to extract
            if ($x === true) {
                $zip->extractTo($targetdir); // place in the directory with same name  
                $zip->close();
    
                unlink($targetzip);


                $metaFileName = $targetdir . '/meta.txt';
                $metaFile = fopen($metaFileName, "r") or die("Unable to open file!");
                $meta = fread($metaFile,filesize($metaFileName));
                fclose($metaFile);

                $metaData = explode("\n", $meta);
                $artworkName = $metaData[0];
                $artworkDesc = $metaData[1];
                
                $thumbnail = false;
                $thumbnail_search = glob($targetdir . '/thumbnail.*');
                if(count($thumbnail_search) > 0) {
                    $thumbnail = $thumbnail_search[0];
                    // $portfolio_list[$i]['thumbnail'] = $thumbnail_search[0];
                }

                $file = false;
                $file_search = glob($targetdir . '/file.*');
                if(count($file_search) > 0) {
                    $file = $file_search[0];
                    // $portfolio_list[$i]['file'] = $file_search[0];
                }

                addToPortfolio($artworkName, $artworkDesc, $thumbnail, $file);
                array_map('unlink', glob("$targetdir/*.*"));
                rmdir($targetdir);

            }
            $message = "Your .zip file was uploaded and unpacked.";
        } else {    
            $message = "There was a problem with the upload. Please try again.";
        }
    }
}


?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Upload Artwork</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="../css/admin.css" />
</head>
<body>
    <div id="content">
        <div class="title">UPLOAD ARTWORK</div>
        <?php if(isset($message)) echo "<div class='success-message'><b>Success: </b>$message</b></div>"; ?>
        
        <form enctype="multipart/form-data" method="post" action="">
            <label>
                Choose a zip file to upload:
                <br /><br />
                <input class="file-upload" type="file" name="zip_file" />
            </label>
            <br />
            <button type="submit" name="submit">Upload</button>
        </form>

        <ul id="portfolio-list"></ul>
    </div>

    <script src="../js/dan-scripts.js"></script>
    <script src="../js/velocity.min.js"></script>
    <script>
        loadPortfolio(document.getElementById('portfolio-list'), false);
    </script>
</body>
</html>