package de.gregoryseibert.baeckereibackend.service;

import de.gregoryseibert.baeckereibackend.model.exception.NotFoundException;
import de.gregoryseibert.baeckereibackend.model.exception.UnprocessableException;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.bind.DatatypeConverter;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * The FileSystemStorageService class is used to handle creating and reading files.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@Service
public class FileSystemStorageService {
    private final String STORAGELOCATION = "upload-dir";
    private final String DIGESTMETHOD = "md5";
    private final List<String> ALLOWEDFILEEXTENSIONS = new ArrayList<>(Arrays.asList(".jpg", ".png"));
    private final Path ROOTLOCATION;

    public FileSystemStorageService() {
        this.ROOTLOCATION = Paths.get(STORAGELOCATION);
        init();
    }

    String store(MultipartFile file) {
        String[] originalFileNameSplit = StringUtils.cleanPath(file.getOriginalFilename()).split("\\.");
        String fileExtension = "." + originalFileNameSplit[originalFileNameSplit.length - 1];

        if (!ALLOWEDFILEEXTENSIONS.contains(fileExtension)) {
            throw new UnprocessableException("Failed to store file. File extension ('" + fileExtension + "') invalid. Valid extensions: " + ALLOWEDFILEEXTENSIONS.toString());
        }

        String filename;

        try {
            MessageDigest md5Digest = MessageDigest.getInstance(DIGESTMETHOD);

            byte[] digest = md5Digest.digest(("" + System.currentTimeMillis()).getBytes());

            filename = DatatypeConverter.printHexBinary(digest).toUpperCase() + fileExtension;
        } catch (NoSuchAlgorithmException e) {
            throw new UnprocessableException("Failed to generate filename.");
        }

        try {
            if (file.isEmpty()) {
                throw new UnprocessableException("Failed to store empty file " + filename);
            }

            if (filename.contains("..")) {
                throw new UnprocessableException("Cannot store file with relative path outside current directory " + filename);
            }

            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, ROOTLOCATION.resolve(filename), StandardCopyOption.REPLACE_EXISTING);
                return filename;
            }
        } catch (IOException e) {
            throw new UnprocessableException("Failed to store file " + filename + "; " + e);
        }
    }

    private Path load(String filename) {
        return ROOTLOCATION.resolve(filename);
    }

    public Resource loadAsResource(String filename) {
        try {
            Path file = load(filename);

            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new NotFoundException("Could not read file: " + filename);
            }
        } catch (MalformedURLException e) {
            throw new NotFoundException("Could not read file: " + filename + "; " + e);
        }
    }

    void delete(String filename) {
        try {
            Files.delete(load(filename));
        } catch (IOException e) {
            System.out.println("Could not delete file: " + filename);
        }
    }


    private void deleteAll() {
        FileSystemUtils.deleteRecursively(ROOTLOCATION.toFile());
    }

    private void init() {
        try {
            Files.createDirectories(ROOTLOCATION);
        } catch (IOException e) {
            throw new UnprocessableException("Could not initialize storage" + e);
        }
    }
}
