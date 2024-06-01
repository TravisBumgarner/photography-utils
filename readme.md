# Adding New Photos

1. Select photos
    - Add them to `01 Potential Pickss`
2. Select photos 
    - Add them to `02 Selected`
3. Tag photos. 
    - Add new tags in Lightroom and `src/tags` 
    - Move to `03 Tagged`
4. Export photos
    - Run this script (`yarn main`)
    - Open Buffer
    - Queue each photo
        - Spellcheck each template
        - Output from template
        - Location
    - Queue photos and move to `04 Queued`
5. Once photos are posted
    - Move to `05 Posted`
    - Add `Purple` color label. 

# Setup for New Computer

- Create an Export Template
    - Name it `cameracoffeewander_template_ingest`
    - Export Location
        - Export To: Specific folder
            - Folder: C:\Users\Travis\Desktop
        - [x] Put in Subfolder `cameracoffeewander_template_ingest`
        - Existing Files
            - Ask what to do
    - File Renaming
        - Custom Settings
            - `{Sequence 01}-{Filename}`
    - File Settings
        Image Format
            - JPEG
        - Quality
            - 100
    - Image Resizing
        - [x] Resize to Fit: 
            - Width & Height
            - W: 2000
            - H: 2000
        - [x] Don't Enlarge
    - Output Sharpening
        - [x] Sharpen For
            - Screen
            - Amount
                - Standard
    - Metadata
        - Incude 
            - All Metadata
        - [x] Remove Person Info
        - [x] Remove Location Info
        - [x] Write Keywords as Lightroom Hierarchy
    
# Setup for New Camera

1. Copy camera name from error message `Error: unsupported cameraDJI - FC3582`
2. Add to SupportedCameras in `types.ts`
3. Add to Switch in `metadataOverride.ts`

# Setup for New Tag

1. Nest tag correctly in Lightrooom. For Example `cameracoffeewander -> Camera -> NikonZ1000`
2. Follow the same hierarchy in Code.
3. Go grab some accounts and tags.