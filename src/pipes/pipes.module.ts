import { NgModule } from '@angular/core';
import { SportFilterPipe } from './sport-filter/sport-filter';
import { MomentFilterPipe } from './moment-filter/moment-filter';
@NgModule({
	declarations: [SportFilterPipe,
    MomentFilterPipe],
	imports: [],
	exports: [SportFilterPipe,
    MomentFilterPipe]
})
export class PipesModule {}
