<?php

namespace App\Manager;
use App\Exceptions\ExceptionMessages;
use App\Interface\IGenericRepository;

class GenericManager{
    private $obj;

    public function __construct($obj) {
        $this->obj = $obj;
    }

    public function findById($id, $with= []) {
        try{
            return $this->obj->with($with)->find($id);
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }      
    }

    public function getAll($request = null, $with=[], $perPage = 20, 
                            $page =1, $sortBy = null, $sortOrder = 'asc'){
        try{
            $data = $request? $request->json()->all() : [];
            $query =  $this->obj->with($with)->where($data);
            
            if($sortBy && in_array($sortOrder,['asc', 'dec'])){
                $query->orderBy($sortBy, $sortOrder);
            }
            $result = $query->paginate($perPage, ['*'], 'page', $page);
           
            return $result->items();
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function create($request) {
        try{
            $data  = $request->json()->all();

            $fillableProperty = 'fillable';
            $modelClassName = get_class($this->obj);

            $reflectionClass = new \ReflectionClass($modelClassName);
            $fillablePropertyReflection = $reflectionClass->getProperty($fillableProperty);
            $fillablePropertyReflection->setAccessible(true);

            $fillableArray = $fillablePropertyReflection->getValue($this->obj);

            foreach ($data as $key => $value) {
                if (in_array($key, $fillableArray)) {
                    $this->obj->$key = $value;
                }
            }

            $this->obj->save();

            return response()->json([
                'status'=> 'success',
                'data'=> $this->obj
            ], 201);
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function createWithSpecificUser($request) {
        try{
            $data = $request->json()->all();
            $user = auth()->user();
            $this->obj->fill($data);
            $this->obj->user()->associate($user);
            $this->obj->save();

            return response()->json([
                'status'=> 'success',
                'data'=> $this->obj
            ], 201);
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    
    public function update($request, $id){
        try{
            $data  = $request->json()->all();
            $updated_model= $this->findById($id);

            if(!$updated_model){
                return ExceptionMessages::NotFound(class_basename($this->obj));
            }

            foreach ($data as $key => $value) {
                // $model_find->update([$key=>$value]);
                $updated_model->$key = $value;
            }

            $updated_model->save();

            return response()->json([
                'status'=> 'success',
                'data'=> $updated_model
            ]);
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function delete( $id){
        try{
            $model_toDelete= $this->findById($id);
            if(!$model_toDelete){
                return ExceptionMessages::NotFound(class_basename($this->obj));
            }
            $model_toDelete->delete();
            return response()->json([
                'status'=> 'success',
                'message'=> class_basename($this->obj). " successfully deleted" 
            ]);
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function massdelete($request){
        try {
            $data  = $request->json()->all();
            $key = reset($data);
            $existing_models = $this->findById($key);

            if($existing_models->isEmpty()){
                return ExceptionMessages::NotFound(class_basename($this->obj));
            }
    
            $existing_models->each(function ($model) {
                $model->delete();
            });
    
            return response()->json([
                'status' => 'success',
                'message' => class_basename($this->obj) . "s successfully deleted"
            ]);
        } catch (\Exception $exception) {
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

}



// $this->user->update([
//     "first_name" => $request->first_name ?? $data["first_name"],
//     "last_name" => $request->last_name ?? $data["last_name"],
//     "password" => $request->password ?? $data["password"],
//     "phone_number" => $request->phone_number ?? $data["phone_number"],
//     "img_url" => $request->img_url ?? $data["img_url"]
// ]);

// $ride = new Ride;
// $ride->passenger_id = $this->user->id;
// $ride->start_location = $data['start_location'];
// $ride->end_location = $data['end_location'];
// $ride->start_time = $data["start_time"];
// $ride->status_id  = 1;
// $ride->save();

// echo "Key: $key, Value: $value" . PHP_EOL;
// echo "$model->$key = $value " . PHP_EOL;