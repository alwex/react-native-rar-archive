#import "RarArchive.h"

@implementation RarArchive
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(unrar:(NSString *)from
                  to:(NSString *)toPath
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    NSError *archiveError = nil;
    NSError *error = nil;

    URKArchive *archive = [[URKArchive alloc] initWithPath:from error:&archiveError];


    BOOL extractFilesSuccessful = [archive extractFilesTo:toPath
                                  overwrite:NO
                                  error:&error];
    if (extractFilesSuccessful) {
      resolve(toPath);
    } else {
      reject(@"unrar_error", @"Failed to unrar", error);
    }
}

@end
