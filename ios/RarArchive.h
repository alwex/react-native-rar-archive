
#import "UnrarKit/UnrarKit.h"


#ifdef RCT_NEW_ARCH_ENABLED
#import "RNRarArchiveSpec.h"

@interface RarArchive : NSObject <NativeRarArchiveSpec>
#else
#import <React/RCTBridgeModule.h>

@interface RarArchive : NSObject <RCTBridgeModule>
#endif

@end
